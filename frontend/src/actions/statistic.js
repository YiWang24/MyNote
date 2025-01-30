"use server";
async function fetchGitHubStars(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("GitHub API failed");
    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    return 0;
  }
}

export { fetchGitHubStars };
