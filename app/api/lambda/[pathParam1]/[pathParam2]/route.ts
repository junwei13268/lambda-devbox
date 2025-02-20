import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { pathParam1: string, pathParam2: string } }
) {
  try {
    // get path params
    const { pathParam1, pathParam2 } = params;
    // get query string
    const parsedUrl = new URL(req.url || '');
    const queryString = new URLSearchParams(parsedUrl.searchParams).toString();
    const headers = JSON.parse(req.headers.get('passheaders') || '{}');
    const result = await fetch(`${process.env.API_URL}/${pathParam1}/${pathParam2}?${queryString}`, { headers: { ...headers, 'Content-Type': 'application/json' } });
    const response = await result.json();
    console.log(response)
    return new Response(JSON.stringify({ status: response.statusCode, headers: response.headers, body: response.body }));
  } catch (err) {
    return new Response(JSON.stringify({ status: 500, headers: {}, body: err }))
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { pathParam1: string, pathParam2: string } }
) {
  try {
    // get path params
    const { pathParam1, pathParam2 } = params;
    // get query string
    const parsedUrl = new URL(req.url || '');
    const queryString = new URLSearchParams(parsedUrl.searchParams).toString();
    const headers = JSON.parse(req.headers.get('passheaders') || '{}');
    let body = {};
    try {
      body = await req.json();
    } catch (error) { }
    const result = await fetch(`${process.env.API_URL}/${pathParam1}/${pathParam2}?${queryString}`, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const response = await result.json();
    return new Response(JSON.stringify({ status: response.statusCode, headers: response.headers, body: response.body }));
  } catch (err) {
    return new NextResponse(JSON.stringify({ status: 500, error: err }))
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { pathParam1: string, pathParam2: string } }
) {
  try {
    // get path params
    const { pathParam1, pathParam2 } = params;
    // get query string
    const parsedUrl = new URL(req.url || '');
    const queryString = new URLSearchParams(parsedUrl.searchParams).toString();
    const headers = JSON.parse(req.headers.get('passheaders') || '{}');
    let body = {};
    try {
      body = await req.json();
    } catch (error) { }
    const result = await fetch(`${process.env.API_URL}/${pathParam1}/${pathParam2}?${queryString}`, { method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const response = await result.json();
    return new Response(JSON.stringify({ status: response.statusCode, headers: response.headers, body: response.body }));
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }))
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { pathParam1: string, pathParam2: string } }
) {
  try {
    // get path params
    const { pathParam1, pathParam2 } = params;
    // get query string
    const parsedUrl = new URL(req.url || '');
    const queryString = new URLSearchParams(parsedUrl.searchParams).toString();
    const headers = JSON.parse(req.headers.get('passheaders') || '{}');
    let body = {};
    try {
      body = await req.json();
    } catch (error) { }
    const result = await fetch(`${process.env.API_URL}/${pathParam1}/${pathParam2}?${queryString}`, { method: 'DELETE', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const response = await result.json();
    return new Response(JSON.stringify({ status: response.statusCode, headers: response.headers, body: response.body }));
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }))
  }
}

export async function OPTIONS(
  req: NextRequest,
  { params }: { params: { pathParam1: string, pathParam2: string } }
) {
  try {
    // get path params
    const { pathParam1, pathParam2 } = params;
    // get query string
    const parsedUrl = new URL(req.url || '');
    const queryString = new URLSearchParams(parsedUrl.searchParams).toString();
    const headers = JSON.parse(req.headers.get('passheaders') || '{}');
    let body = {};
    try {
      body = await req.json();
    } catch (error) { }
    const result = await fetch(`${process.env.API_URL}/${pathParam1}/${pathParam2}?${queryString}`, { method: 'DELETE', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    // headers
    const responseHeaders: Record<string, string> = {};
    result.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" };
    const finalHeaders = { ...responseHeaders, ...corsHeaders };

    return new Response(JSON.stringify({ status: result.status, headers: finalHeaders }));
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }))
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { pathParam1: string, pathParam2: string } }
) {
  try {
    // get path params
    const { pathParam1, pathParam2 } = params;
    // get query string
    const parsedUrl = new URL(req.url || '');
    const queryString = new URLSearchParams(parsedUrl.searchParams).toString();
    const headers = JSON.parse(req.headers.get('passheaders') || '{}');
    let body = {};
    try {
      body = await req.json();
    } catch (error) { }
    const result = await fetch(`${process.env.API_URL}/${pathParam1}/${pathParam2}?${queryString}`, { method: 'PATCH', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const response = await result.json();
    return new Response(JSON.stringify({ status: response.statusCode, headers: response.headers, body: response.body }));
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }))
  }
}

export async function HEAD(
  req: NextRequest,
  { params }: { params: { pathParam1: string, pathParam2: string } }
) {
  try {
    // get path params
    const { pathParam1, pathParam2 } = params;
    // get query string
    const parsedUrl = new URL(req.url || '');
    const queryString = new URLSearchParams(parsedUrl.searchParams).toString();
    const headers = JSON.parse(req.headers.get('passheaders') || '{}');
    let body = {};
    try {
      body = await req.json();
    } catch (error) { }
    const result = await fetch(`${process.env.API_URL}/${pathParam1}/${pathParam2}?${queryString}`, { method: 'DELETE', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const responseHeaders: Record<string, string> = {};
    result.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    return new Response(JSON.stringify({ status: result.status, headers: responseHeaders }));
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }))
  }
}
