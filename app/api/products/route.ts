import { supabaseServer } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/products - List all public products
export async function GET(request: NextRequest) {
  try {
    const supabase = supabaseServer()
    
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit') || '12'
    const offset = searchParams.get('offset') || '0'

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('hidden', false)
      .eq('archived', false)
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1)

    // Apply filters
    if (category) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single()
      
      if (cat) {
        query = query.eq('category_id', cat.id)
      }
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,short_description.ilike.%${search}%,tags.cs.{${search}}`
      )
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      products: data,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = supabaseServer()
    
    // Check if user is authenticated
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!userData?.is_admin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Get product data from request body
    const body = await request.json()
    
    const { error: insertError, data } = await supabase
      .from('products')
      .insert([
        {
          name: body.name,
          slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
          description: body.description,
          short_description: body.short_description,
          category_id: body.category_id,
          price: body.price,
          discount_price: body.discount_price,
          version: body.version,
          compatibility: body.compatibility,
          tags: body.tags || [],
          created_by: user.id,
        },
      ])
      .select()

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
