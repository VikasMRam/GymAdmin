# Sly e2e

The code for e2e.

### Ensure that you have an admin user 

It has to have email `slytest+admin@seniorly.com` and `password` nopassword

```sql
INSERT INTO public.users
  ("name", email, active, organization_id, admin, role_id, encrypted_password, uuid, slug)
  VALUES('Sly Test Admin', 'slytest+admin@seniorly.com', true, 1, true, 4095, '$2a$10$LyZ9Vt/aydLA8EdDCbGonOVwX5hbUlBkh8fkIQkBhq.aEyr7i5wrq','4bddef67-9259-4b79-a313-25b99df7713d', '6e53867b9a0a56c555dde172b76144f6');
 
```

### Examples

To run the tests you have to be in the e2e directory

```bash
$ cd e2e
$ npx cypress run
```

To run the tests only in laptop

```bash
$ # accepts laptop, tablet and mobile
$ CYPRESS_vieport=laptop npx cypress run 
```

To debug or develop the tests

```bash
$ # good idea is to do it for only one viewport as it has faster turn around
$ CYPRESS_viewport=laptop npx cypress open
```

> :warning: **Important note** \
Try to avoid running npm installs in this folder. If you want to add an npm package that is used only by this folder then add it to \
package.json here. If the npm package is used by other folders then it's better to add it in root's package.json though it will be \
hoisted to root node_modules. \
**After adding a new package don't forget to run ```npm i``` from root.**

## Testing

Run ```npm test``` command in this folder to run all available unit tests for this package.

## Linting

Run ```npm run lint``` command in this folder to do linting in this package.
