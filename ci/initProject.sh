#!/bin/bash  

if [[ -z "${CI_PROJECT_ID}" ]]; then
  echo "# Enter the project id"
  echo "You can get token on repository page"
  echo "project id: "  
  read PROJECT_ID
else
  PROJECT_ID="${CI_PROJECT_ID}"
fi

CI_REGISTRY="https://gitlab.com/api/v4/projects/$PROJECT_ID/packages/npm/"

if [[ -z "${CI_JOB_TOKEN}" ]]; then
  echo "# Enter the user token"
  echo "You can get token on https://gitlab.com/-/profile/personal_access_tokens"
  echo "Token: "  
  read PUBLISH_TOKEN
else
  PUBLISH_TOKEN="${CI_JOB_TOKEN}"
fi

echo "# Install yarn berry"
yarn policies set-version berry
yarn plugin import version
yarn config set nodeLinker node-modules
yarn config set npmScopes --json "{
  \"slr-finance\":
    {
      \"npmAlwaysAuth\": true, 
      \"npmAuthToken\": \"$PUBLISH_TOKEN\", 
      \"npmPublishRegistry\": \"$CI_REGISTRY\", 
      \"npmRegistryServer\": \"$CI_REGISTRY\"
    }
}"

yarn install
