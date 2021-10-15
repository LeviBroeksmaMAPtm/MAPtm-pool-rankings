aws s3 sync ./dist/ s3://poolranking
aws cloudfront create-invalidation --distribution-id EJYSHGEHBZDY --paths "/*"
PAUSE
