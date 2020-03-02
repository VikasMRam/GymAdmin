# Batch Update (Images)

Like for example when you add At the current time there is not a clear way in JSON:API how to do batch updating in transactional way (all requests fail or succeed in the batch), assuming we will sacrifice this particular requirement, here a proposal of how to do this in our system using image galleries as an example of batch CRUD.

The greatest challenge is the size of the requests, we have to 
## Removing galleries

~Our tables `galleries` and `video_galleries` don't hold any data, so the polymorphic relationship should be done at `Video` and `Image` levels~:

```sql
CREATE TABLE public.images (
	id serial NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	path varchar(255) NULL,
	sort int4 NULL,
	description text NULL,
	user_id int4 NULL,
	slug varchar NOT NULL DEFAULT md5(random()::text),
	owner_id int4 NULL,
	owner_type varchar(255) NULL,
	CONSTRAINT images_pkey PRIMARY KEY (id),
	CONSTRAINT images_slug_key UNIQUE (slug)
);

CREATE INDEX index_images_on_owner_id_and_owner_type ON public.images USING btree (owner_id, owner_type);
```

^ this does not stand anymore, let's follow current schema where images belong to gallery and gallery to gallery-able polymorphic relationshiop

The only thing that we have to change in the model is calling the db `sequence` column in the db `order` of `sortOrder` in the api.

## Data schema

```
{
  "id": string,
  "type: "Image"
  "attributes": {
    "path": string,
     ^ s3 bucket path (folder, filename), not the key and same name as in "disk", NOT url encoded
    "description": string
     ^ used to compliment "alt" attribute if present
    "order": int,
     ^ the sorting order 
  }
}
```

Note the absence of a `"name"` (or `"title"`) attribute, as it gives no SEO advantage.

## Necessary endpoints

### Create

Adding an image, this is a double step, first we have to acquire a temporary signed url for s3

```http request
GET /v0/uploads/s3-signed-url?file=[url-encoded-filename]

{
  "path": "[folder]/[filename]",
  "signedUrl": "http://bucket.s3.aws......",
   ^ signed url for private key /uploads(or temp)/[folder]/[image]
}
```

Actual key at that point being for example: `temp/83080026d3337c666cc71dead8bc9c4c/Mission_Villa.jpg`

Then we add the image resource

```http request
POST /v0/marketplace/images

{
  "data": {
    "type": "Image",
    "attributes": {
      "path": "83080026d3337c666cc71dead8bc9c4c/Mission_Villa.jpg",
       ^ the path is not the key, also no first segment (temp|uploads), not url encoded 
      "description: "",
      // "order": 2,
       ^ if the image should by default be added at the end
    }
  }
  "relationships": {
    "Gallery": {
      "data": {
        "id": 1,
        "type": "Galery",
      }
    }
  }
}
```

Api should be able to manage the relationship;

### Remove

```http request
DELETE /v0/marketplace/images/2
```

### Edit one image

In this example we just add a description

```http request
PATCH /v0/marketplace/images/2

{
  "data": {
    "type": "Image",
    "id": 2,
    "attributes": {
      "description: "new description"
    }
  }
}
```

### Sort using resource endpoint

A series of http requests

```http request
PATCH /v0/marketplace/images/1

{
  "data": {
    "type": "Image",
    "id": 1,
    "attributes": {
      "order": 0
    }
  }
}
```


```http request
PATCH /v0/marketplace/images/2

{
  "data": {
    "type": "Image",
    "id": 2,
    "attributes": {
      "order": 1
    }
  }
}
```

... etc
