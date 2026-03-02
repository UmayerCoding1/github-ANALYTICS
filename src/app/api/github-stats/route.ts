import { NextResponse } from 'next/server';
import { fetchGitHubData } from '@/lib/github';

export async function GET() {
    try {
        const data = await fetchGitHubData();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('GitHub API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch GitHub data' },
            { status: 500 }
        );
    }
}
