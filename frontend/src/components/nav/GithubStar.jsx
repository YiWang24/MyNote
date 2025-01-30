import { RainbowButton } from "@/components/ui/rainbow-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { fetchGitHubStars } from "@/actions/statistic";

const GithubStar = ({ owner, repo, className, href }) => {
  const stars = fetchGitHubStars(owner, repo);

  return (
    <RainbowButton className={className}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
        <span>Star on GitHub ⭐ {stars}</span>
      </Link>
    </RainbowButton>
  );
};

export default GithubStar;
