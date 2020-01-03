# Image Handler Lambda Function

Install aws-sam; it's a lengthy process but straightforward.

Compile it locally in docker with aws-sam using node 10.x as platform:

```bash
sam build --template template.yaml --use-container
cd .aws-sam/build/Function
npm run build:zip
```

This is relevant to get docker to compile `sharp` in the same target that will be used by the Amazon servers. 
Alternative methods like calling `npm install --arch=x64 --platform=linux --target=10.16.0 sharp` but that 
would make difficult to test the function locally.

Then 
- upload that zip to the lambda function
- publish a new version
- link and deploy the new version from the correspondent api gateway stage

To run the function locally (after `sam build...`) just run

```sh
sam local invoke --event [test event file path] 
```

Where the test event file contents can for example be:

```json
{
  "path": "/images/a1200x800/0e5f2cae2dbee1e6b9ce3bfdd9a6ea9d/AV-4291_sm.webp"
}
```

