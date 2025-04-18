import { defineQuery } from "next-sanity";

export const STARTUP_QUERY =
  defineQuery(`*[_type == "startups" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug, 
  _createdAt, 
  views, 
  description, 
  category, 
  author -> {_id, name, username, image, bio},
  image
}`);

export const STARTUP_QUERY_BY_ID =
  defineQuery(`*[_type == "startups" && _id == $id][0]{
  _id, 
   title, 
   slug, 
   _createdAt, 
   views, 
   description, 
   category, 
   author -> {_id, name, username, image, bio},
   image, 
   pitch,
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startups" && _id == $id][0]{
  _id, views
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
  
}`);
