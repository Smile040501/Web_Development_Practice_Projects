/*  REST API STANDARDS

>   Use Nouns instead of verbs to represent resources

>   Don't put HTTP verb (or CRUD function names) in URIs

>   Use forward slash (/) to indicate hierarchical relationships
    Don't use trailing forward slash (/) in URIs

>   Use hyphens (-) to improve readability of URIs and don't use underscores (_)

>   Use lowercase letters in URIs

>   Don't use file extensions

>   Resource can be singular or plural (plural preferred)
    Ex. "customers" is a collection resource and "customer" is a singleton resource

>   Use correct HTTP status methods to be more specific and handle errors gracefully

>   Accept and respond with JSON

>   Allow filtering, sorting, pagination and rate-limiting

>   Ex. Logical Nesting and relationships in URIs

-------------------------------------------------------------------------------------------------------------
Resource                    |       POST        |       GET         |       PUT         |       DELETE      |
-------------------------------------------------------------------------------------------------------------
/customers                  |    Create a       |   Get all         |   Bulk update     |   Delete all      |
                            |    new customer   |   customers       |   of customers    |   customers       |
-------------------------------------------------------------------------------------------------------------
/customers/:id              |   Undefined       |   Get customer    |   Update details  |   Delete customer |
                            |                   |   with {id}       |   of customer     |   with {id}       |
                            |                   |                   |   with {id}       |                   |
-------------------------------------------------------------------------------------------------------------
/customers/:id/orders       |   Create a new    |   Get all         |   Bulk update     |   Delete all      |
                            |   order for {id}  |   orders for      |   of orders for   |   orders for      |
                            |   customer        |   customer {id}   |   customer {id}   |   customer {id}   |
-------------------------------------------------------------------------------------------------------------
/customers/:id/orders/:oid  |   Undefined       |   Get order {oid} |   Update order    |   Delete order    |
                            |                   |   for customer    |   with {oid} for  |   with {oid} for  |
                            |                   |   with {id}       |   customer {id}   |   customer {id}   |
-------------------------------------------------------------------------------------------------------------


Common HTTP Status Codes:

200 : OK
201 : Created
307 : Temporary Redirect
308 : Permanent Redirect
400 : Bad Request
401 : Unauthorized / Unauthenticated / Authentication Failed
403 : Forbidden (Unlike 401, server knows client identity)
404 : Not Found
405 : Method not allowed
422 : Request was well-formed but was unable to forward due to semantic errors (Ex. input validation)
429 : Too many Requests
500 : Internal Server Error

*/
