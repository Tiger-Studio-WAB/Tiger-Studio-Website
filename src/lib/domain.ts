export function isAzureProvider(provider: string | null | undefined): boolean {
  return provider === "azure";
}

export function isGitHubProvider(provider: string | null | undefined): boolean {
  return provider === "github";
}

export function isAllowedProvider(provider: string | null | undefined): boolean {
  return isGitHubProvider(provider) || isAzureProvider(provider);
}

export function isAllowedMember(
  _email: string | null | undefined,
  provider: string | null | undefined,
): boolean {
  return isAllowedProvider(provider);
}
