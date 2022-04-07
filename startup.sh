#!/bin/sh

echo NEXT_PUBLIC_JAHIA_BASE_URL="$JAHIA_BASE_URL" > .env.local
echo NEXT_PUBLIC_JAHIA_SITE=headless-industrial >> .env.local
echo NEXT_PREVIEW_SECRET="57e22073-2485-43fe-b9a1-9205d5310561" >> .env.local
echo JAHIA_API_TOKEN="V+InkyRlQ/65oZIJ1TEFcYcfgC1Wyk7LE81s9v84CY0=" >> .env.local

echo " == Waiting for Jahia to startup"
while [ "$(curl -s -o /dev/null -w ''%{http_code}'' ${JAHIA_BASE_URL}/cms/login)" != "200" ];
  do sleep 5;
done

if [ "_$DEV" = "_true" ]
then
    npm run dev
else
    npm run build
    npm run start
fi

