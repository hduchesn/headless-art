# The Jahia Nextjs initiative : *Next.js App*

The aim of the Jahia Nextjs initiative is to explore and explain
the Jahia capabilities to easily create and manage headless web project.
Solutions we use are :
- [Jahia][jahia-website] : a Cloud / On-premise *DXP* solution to create and contribute
- [Vercel][vercel-website] a next-js Cloud platform provider to render the web project

To know more about the Jahia Nextjs initiative [read this dedicated page][initiative.md].

## Prerequisite
This github repository is one of three in the initiative and corresponds to the next.js
app part. This app start as a simple [Next.js](https://nextjs.org/) project bootstrapped
with [create-next-app]. Then the jahia team created templates and components to render
web pages created, configured and contributed in Jahia. This application cannot run alone
without its backend content.

> Please be sur you have an up and running environment before to continue.
> To know more about the setup of this app [read this dedicated page][setup.md].

>To know more about the architecture [read this dedicated page][archi.md]

## Create a component
This section explains how to create a new component. Before to start let's explain what you
will create.

### Objective
You will create a component to render a new content type named blog. 
A blog has the following properties :
- a **Title**
- a **Release Date**
- a **Teaser**
- a **Body**
- an **Image**

The React component must render the content like this :

<img src="/doc/images/001_blog.png" width="500px"/>

To reach the objective you have to follow three steps to follow :
- Define the new content type you want to manage
- Create the React component to render it
- Register your component


### Define a new content type
Content types are managed in the backend by Jahia. Thus, to add a new content type you can
update an existing definition file (.cnd) into a Jahia module or create a new one and enable it for
your web project in Jahia.
For this tutorial you will update an existing definition file. As explain in the Jahia Nextjs
initiative documentation, there are three modules involved in the project and the
[jahia-industrial] module is the owner of the content definition.
As this steps is not relative to next-js we already create the content definition for you
. So you do not have anything to do.

To know more about how to update/create a content type for this project
[read this dedicated page][content-type.md].


### Build the React component

#### Step 1 create the component file with static HTML
Create a new file in the **components** folder named **Blog.js**.
Add the following code to the file :
```js
import React from "react";
import * as PropTypes from "prop-types";

function Blog({id}) {
    return (
        <div className="media mb-4 d-md-flex d-block">
            <a href="#" className="mr-5">
                <img
                    className="img-fluid"
                    src="images/industrial_blog_1.jpg"
                    alt="Free website template by Free-Template.co"
                />
            </a>
            <div className="media-body">
                <span className="post-meta">Feb 26th, 2018</span>
                <h3 className="mt-2 text-black">
                    <a href="#">
                        How to handle any intercate custom design
                    </a>
                </h3>
                <p>
                    Separated they live in Bookmarks grove right at the coast of the Semantics, a large language ocean.
                </p>
                <p>
                    <a href="#" className="readmore">
                        Read More
                        <!-- icon -->
                    </a>
                </p>
            </div>
        </div>
    )
}
Blog.propTypes = {
    id: PropTypes.string.isRequired
};
export default Blog;
```
In the code above we have the minimal set of element to start our component based in the HTML
provided by the designer. For the moment the component is static so the next step is to query
the content dynamically.

#### Step 2 query the content from the Jahia CMS
Now you have your static HTML, you have to request the content from the Jahia CMS

- import component to access the Jahia context and execute a graphQL call
    ```js
    import {JahiaCtx} from "@jahia/nextjs-lib";
    import {gql, useQuery} from "@apollo/client";
    import { CORE_NODE_FIELDS } from './jahia/GQL/fragments';
    ```
- into the Blog function add the following code to get the Jahia context
    ```js
    const {workspace, locale} = React.useContext(JahiaCtx);
    ```
- then write your graphQL query to get the content. To manage its cache properly apollo required
some properties that we have grouped into a graphQL fragment named **CoreNodeFields**
    ```js 
    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                title: property(language:$language, name:"title"){value}
                teaser: property(language:$language, name:"teaser"){value}
                releaseDate: property(name:"releaseDate"){value}
                body: property(language:$language, name:"body"){value}
                image: property(language:$language,name:"image",){
                    node: refNode {
                        ...CoreNodeFields
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;
    ```
- then add the code to execute the query with the appropriate variables and manage loading and error state
    ```js
    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }
    ```
- finally, keep the data returned into a constant 
    ```js
    const content = data?.jcr?.nodeById;
    ```

So your file should look like this :
```js
import React from "react";
import * as PropTypes from "prop-types";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import { CORE_NODE_FIELDS } from './jahia/GQL/fragments';

function Blog({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                title: property(language:$language, name:"title"){value}
                teaser: property(language:$language, name:"teaser"){value}
                releaseDate: property(name:"releaseDate"){value}
                body: property(language:$language, name:"body"){value}
                image: property(language:$language,name:"image",){
                    node: refNode {
                        ...CoreNodeFields
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const content = data?.jcr?.nodeById;

    return (
        <div className="media mb-4 d-md-flex d-block">
            <a href="#" className="mr-5">
                <img
                    className="img-fluid"
                    src="images/industrial_blog_1.jpg"
                    alt="Free website template by Free-Template.co"
                />
            </a>
            <div className="media-body">
                <span className="post-meta">Feb 26th, 2018</span>
                <h3 className="mt-2 text-black">
                    <a href="#">
                        How to handle any intercate custom design
                    </a>
                </h3>
                <p>
                    Separated they live in Bookmarks grove right at the coast of the Semantics, a large language ocean.
                </p>
                <p>
                    <a href="#" className="readmore">
                        Read More
                        <!-- icon -->
                    </a>
                </p>
            </div>
        </div>
    )
}

Blog.propTypes = {
    id: PropTypes.string.isRequired
};
export default Blog;
```
The next step is to replace the static content by the dynamic content returned by the query.

#### Step 3 add the dynamic content into the HTML




<!--
Before to continue, we supposed that you already have a maven environment configured
(java, mvn...).

#### Update and build the content type module 
Clone this module in your local file system
```shell
git clone git@github.com:Jahia/jahia-industrial.git
```
-->

<!--
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/HalfBlock.js.disabled`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
-->

[jahia-website]: https://www.jahia.com
[vercel-website]: https://vercel.com
[initiative.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/README.md
[setup.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/setup.md
[archi.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/architecture.md
[content-type.md]: https://github.com/Jahia/jahia-industrial/blob/main/README.md

[jahia-industrial]: https://github.com/Jahia/jahia-industrial
[create-next-app]: https://github.com/vercel/next.js/tree/canary/packages/create-next-app
