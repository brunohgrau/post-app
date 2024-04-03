import { http, HttpResponse } from "msw";
import { nanoid } from "@reduxjs/toolkit";
import { factory, oneOf, manyOf, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

const NUM_USERS = 3;
const POSTS_PER_USER = 3;
const RECENT_NOTIFICATIONS_DAYS = 7;

const token = nanoid();

/* MSW Data Model Setup */

export const db = factory({
  user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    name: String,
    username: String,
    posts: manyOf("post"),
  },
  post: {
    id: primaryKey(nanoid),
    title: String,
    date: String,
    content: String,
    reactions: oneOf("reaction"),
    comments: manyOf("comment"),
    user: oneOf("user"),
  },
  comment: {
    id: primaryKey(String),
    date: String,
    text: String,
    post: oneOf("post"),
  },
  reaction: {
    id: primaryKey(nanoid),
    thumbsUp: Number,
    hooray: Number,
    heart: Number,
    rocket: Number,
    eyes: Number,
    post: oneOf("post"),
  },
});

const createUserData = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    username: faker.internet.userName(),
  };
};

const createPostData = (user) => {
  return {
    title: faker.lorem.words(),
    date: faker.date.recent({ days: RECENT_NOTIFICATIONS_DAYS }).toISOString(),
    user,
    content: faker.lorem.paragraphs(),
    reactions: db.reaction.create(),
  };
};

// Create an initial set of users and posts
for (let i = 0; i < NUM_USERS; i++) {
  const author = db.user.create(createUserData());

  for (let j = 0; j < POSTS_PER_USER; j++) {
    const newPost = createPostData(author);
    db.post.create(newPost);
  }
}

const serializePost = (post) => ({
  ...post,
  user: post.user.id,
});

/* MSW REST API Handlers */
const allPosts = new Map();

export const handlers = [
  http.get("/fakeApi/posts", function () {
    const posts = db.post.getAll().map(serializePost);
    return HttpResponse.json(posts);
  }),

  http.post("/fakeApi/posts", async function ({ request }) {
    const data = await request.json();

    if (data.content === "error") {
      return new HttpResponse(
        JSON.stringify("Server error saving this post!"),
        {
          status: 500,
        }
      );
    }

    data.date = new Date().toISOString();
    const user = db.user.findFirst({ where: { id: { equals: data.user } } });
    data.user = user;
    data.reactions = db.reaction.create();
    const post = db.post.create(data);
    return HttpResponse.json(serializePost(post));
  }),

  http.get("/fakeApi/posts/:postId", async function ({ params }) {
    const post = db.post.findFirst({
      where: { id: { equals: params.postId } },
    });

    return HttpResponse.json(serializePost(post));
  }),

  http.patch("/fakeApi/posts/:postId", async ({ request, params }) => {
    const { id, ...data } = await request.json();
    const updatedPost = db.post.update({
      where: { id: { equals: params.postId } },
      data,
    });
    return HttpResponse.json(serializePost(updatedPost));
  }),

  http.delete("/fakeApi/posts/:postId", async ({ request, params }) => {
    const deletedPost = db.post.delete({
      where: { id: { equals: params.postId } },
    });

    // Respond with the serialized deleted post
    return HttpResponse.json(serializePost(deletedPost));
  }),

  http.get("/fakeApi/users", async () => {
    return HttpResponse.json(db.user.getAll());
  }),

  http.post("/fakeApi/login", ({ request }) => {
    return HttpResponse.json({
      user: { firstName: "John", lastName: "Doe" },
      token,
    });
  }),

  http.get("/fakeApi/protected", ({ request }) => {
    const headers = request.headers.all();
    if (headers.get("Authorization") === `Bearer ${token}`) {
      return HttpResponse.json({ message: "This is a protected route!" });
    }
    return HttpResponse.json({
      message:
        "Join us on the Reactiflux Discord server in #redux if you have any questions.",
    });
  }),
];
