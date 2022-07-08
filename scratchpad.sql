/*
 *
 *   This is a scratchpad for my business logic queries. 
 *
 *   These queries will differ slightly than what is implemented in the actual application 
 *   due to the fact all queries are generated by TypeORM. I am keeping this public so that 
 *   it may act as an educational resource.
 *
 */


-- Get all beer posts:

SELECT
    beer_post.id,
    beer_post.name,
    beer_post.description,
    beer_type.name AS beer_type,
    beer_post.abv,
    beer_post.ibu,
    beer_post."createdAt",
    beer_post."modifiedAt",
    brewery_post.name AS "breweryName",
    brewery_post.id AS "breweryId",
    "user".username AS "postedByUsername",
    "user".id AS "postedById"
FROM
    beer_post
    INNER JOIN brewery_post ON beer_post."breweryId" = brewery_post.id
    INNER JOIN "user" ON beer_post."postedById" = "user".id
    INNER JOIN beer_type ON beer_type.id = beer_post."typeId";