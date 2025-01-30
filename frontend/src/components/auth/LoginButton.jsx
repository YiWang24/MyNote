import React from "react";

import { PulsatingButton } from "@/components/ui/pulsating-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GitHubButton = ({ icon, login, type, className }) => {
  return (
    <form
      action={async () => {
        await login();
      }}
    >
      <PulsatingButton>
        <FontAwesomeIcon icon={icon} className={className} />
        <span className="pl-2">{type}</span>
      </PulsatingButton>
    </form>
  );
};

export default GitHubButton;
