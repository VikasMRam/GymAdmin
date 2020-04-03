# Profile Creation / Edit

When an user suggest a profile creation or edit, we can think about the possible implementations in two different ways:

- Declarative json:api: this would be posting a json document with the community and all the relationships, deleting a relationship would work by absence as specified in json:api
- Imperative operations: this would be posting a series of operations to be applied to the document and it's relationships.

## Example of Declarative json:api(ish) request

```http request
GET /v0/marketplace/communities/:id
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "Community",
    "id": ":id",
    "attributes": {
      ...
    },
    "relationships": {
      "suggestedEdit": {
        "data": {
          "type": "SuggestedCommunityEdit",
          "id": ":id",
          "attributes": {
            ...
          }
        }
      }
    }
}
```

```http request
PATCH /v0/marketplace/communities/":id HTTP/1.1
Content-Type: application/vnd.api+json
Accept: application/vnd.api+json

{
  "data": {
    "type": "Community",
    "id": ":id",
    "attributes": {
      "propInfo": {
        "ratesText": "$5295",
        "personalSpace": [
          // "2-Bedroom Apartments", <- absence is deleting
          "1-Bedroom Apartments",
          ...
        ],
      }
    },
    "relationships": {
      "address": {
        "data": {
          "type": "Address",
          "id": "1a68758983ce9fafb83dc676c87f4641",
          "attributes": {
            // "city": "San Francisco", <-absence indicates ignore
            "county": "Alameda",
            "latitude": null, // nullifying indicates removing
            "longitude": null,
          }
        }
      },
      "gallery": {
        "data": {
          "type": "Gallery",
          "id": "7d644b8518ba84a9b3c2c2128371afbd",
          "attributes": {
            "createdAt": "2015-04-23T21:26:16Z",
            "updatedAt": "2018-06-05T18:17:38Z"
          },
          "relationships": {
            "images": {
              "data": [
                {
                  "type": "Image",
                  "id": "3ccab710f945cdc45456f3a624b4d1b8", // <- noop
                },
                // {
                //   "type": "Image",
                //   "id": "6d627274f1f5c271b973d29915e07ac1"
                // }, <- absence indicates deleting
                {
                  "type": "Image",
                  "id": "eb43c1d25472bae1dd7d36b8ef33cb0a",
                  "attributes": {
                    "sortOrder": 1, // <- change sort
                  },
                },
                {
                  "type": Image,
                  "attributes": {
                    "name": "Mission_villa_07_10_logo-5.jpg",
                    "path": "cf353653b41892c1a95fd71500493ef7/Mission_villa_07_10_logo-5.jpg",
                    "sortOrder": 2,
                  }
                }, // <- creation
              ]
            }
          }
        }
      }
    }
  }
}
```
... approvals

```http request
POST /v0/marketplace/approval/communityEdit/
```
