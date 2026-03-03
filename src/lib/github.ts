const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export interface GitHubStats {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string | null;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: {
    totalCount: number;
    nodes: Array<{
      name: string;
      description: string | null;
      stargazerCount: number;
      forkCount: number;
      primaryLanguage: { name: string; color: string } | null;
      isPrivate: boolean;
      updatedAt: string;
      url: string;
    }>;
  };
  contributionsCollection: {
    totalCommitContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          contributionCount: number;
          date: string;
        }>;
      }>;
    };
  };
}

export async function fetchGitHubData(): Promise<GitHubStats> {
  const token = process.env.GITHUB_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      "GITHUB_ACCESS_TOKEN is not defined in environment variables"
    );
  }

  const query = `
    query {
      viewer {
        name
        login
        avatarUrl
        bio
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            isPrivate
            updatedAt
            url
          }
        }
        contributionsCollection {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const result = await response.json();
  if (!response.ok || result.errors) {
    throw new Error(
      result?.errors?.[0]?.message || "Failed to fetch GitHub data"
    );
  }

  return result.data.viewer;
}