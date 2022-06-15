import { NextResponse, NextRequest } from 'next/server'
export async function middleware(req, ev) {
    const { pathname } = req.nextUrl
    if (pathname == '/tim-kiem'||pathname == '/danh-muc'||pathname == '/bai-viet') {
        return NextResponse.redirect('/')
    }
    return NextResponse.next()
}