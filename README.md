# The Jahia Nextjs initiative : *Next.js App*

The aim of the Jahia Nextjs initiative is to explore and explain
the Jahia capabilities to easily create and manage headless web project.
Solutions we use are :
- [Jahia][jahia-website] : a Cloud / On-premise *DXP* solution to create and contribute
- [Vercel][vercel-website] a next-js Cloud platform provider to render the web project

To know more about the Jahia Nextjs initiative [read this dedicated page][initiative.md].

- [Prerequisite](#prerequisite)
- [Create a component](#create-a-component)
  - [Objective](#objective)
  - [Define a content type](#define-a-content-type)
  - [Build the React component](#build-the-react-component)
    - [Step 1 create the component file with static HTML](#step-1-create-the-component-file-with-static-html)
    - [Step 2 query the content from the Jahia CMS](#step-2-query-the-content-from-the-jahia-cms)
    - [Step 3 add the dynamic content into the HTML](#step-3-add-the-dynamic-content-into-the-html)
  - [Register your component](#register-your-component)

## Prerequisite
This github repository is one of four in the initiative and corresponds to the next.js
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

>Note: This component already exists in the source code, but we detail in this section how we
> created it.

### Objective
Create a component **MediaContentBloc** to render a content type defined with the name
`hicnt:mediaContentBloc`. 
A Media Content Bloc has the following properties :
- a **Title**: `title`
- a **Teaser**: `teaser`
- an **Icon name**: `iconName`

The React component must render the content like this :

<img src="/doc/images/001_MediaBloc.png" width="500px"/>

To reach the objective you must consider the following three steps :
- Define the content type you want to manage
- Create the React component to render it
- Register your component

### Define a content type
Content types are managed in the backend by Jahia. Thus, to add a new content type you can
update an existing definition file (.cnd) into a Jahia module or create a new one and enable it for
your web project in Jahia.
For this **MediaBloc** the definition already exists in the module [jahia-industrial] which is the
owner of the content definition for the whole application.

<!--To know more about how to update/create a content type for this project
[read this dedicated page][content-type.md].-->


### Build the React component

#### Step 1 create the component file with static HTML
Create a file in the **components** folder named **MediaContentBloc.js**.
Add the following code to the file :
```js
import React from "react";
import PropTypes from "prop-types";

function MediaContentBloc({id}){

    return (
        <div className="media block-6 d-block text-center">
            <div className="icon mb-3"><span className="ion-android-notifications text-primary"></span></div>
            <div className="media-body">
                <h3 className="heading">Modern Design</h3>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost
                  unorthographic.</p>
            </div>
        </div>
    )
}

MediaContentBloc.propTypes = {
  id: PropTypes.string.isRequired
};
export default MediaContentBloc;
```
In the code above we have the minimal set of element to start our component based on the **HTML
provided by the designer**. For the moment the component is static so the next step is to query
the content dynamically.

#### Step 2 query the content from the Jahia CMS
Now you have your static HTML, you have to request the content from the Jahia CMS

- import the useNode function to access easily the content properties. Note that useNode is a wrapper function
to simplify graphQL call
    ```js
    import {useNode} from "@jahia/nextjs-sdk";
    ```
- into the MediaContentBloc function add the following code to get the content properties
    ```js
    const {data, error, loading} = useNode(id, ['title', 'teaser', 'iconName']);
    ```
- then manage loading and error state
    ```js
    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }
    ```
- finally, keep the properties returned into constants
    ```js
    const {title,teaser,iconName} = data.properties;
    ```

So your file should look like this :
```js
import React from "react";
import * as PropTypes from "prop-types";
import {useNode} from "@jahia/nextjs-sdk";

function MediaContentBloc({id}) {
    const {data, error, loading} = useNode(id,["title","teaser","iconName"]);

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const {title,teaser,iconName} = data.properties;

    return (
        <div className="media block-6 d-block text-center">
            <div className="icon mb-3"><span className="ion-android-notifications text-primary"></span></div>
            <div className="media-body">
                <h3 className="heading">Modern Design</h3>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost
                  unorthographic.</p>
            </div>
        </div>
    )
}

MediaContentBloc.propTypes = {
    id: PropTypes.string.isRequired
};
export default MediaContentBloc;
```
The next step is to replace the static content by the dynamic content returned by the query.

#### Step 3 add the dynamic content into the HTML
Here you have to manage properly the icon. You get an iconName from the content, and based on this
name you have to return a svg icon. To manage this situation you can use the icon components from
`react-bootstrap-icons`.
- Import the components to manage icons
    ```js
    import * as Icons from 'react-bootstrap-icons';
    ```
- Write a function to use the appropriate icon component based on the iconName
    ```js
    const getIcon = () => {
        if (iconName) {
            const {[iconName]: Icon} = Icons;
            if (Icon) {
                return <Icon className="text-primary"/>;
            }
        }
    };
    ```
- Finally, replace static content with dynamic properties
    ```js
    <div className="media block-6 d-block text-center">
        <div className="icon mb-3">
            {getIcon()}
        </div>
        <div className="media-body">
            <h3 className="heading">{title}</h3>
            <p>{teaser}</p>
        </div>
    </div>
    ```

So your file should look like this :
```js
import React from "react";
import * as PropTypes from "prop-types";
import {useNode} from "@jahia/nextjs-sdk";
import * as Icons from 'react-bootstrap-icons';

function MediaContentBloc({id}) {
    const {data, error, loading} = useNode(id,["title","teaser","iconName"]);

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const {title,teaser,iconName} = data.properties;
    const getIcon = () => {
        if (iconName) {
            const {[iconName]: Icon} = Icons;
            if (Icon) {
                return <Icon className="text-primary"/>;
            }
        }
    };
    
    return (
        <div className="media block-6 d-block text-center">
            <div className="icon mb-3">
                {getIcon()}
            </div>
            <div className="media-body">
                <h3 className="heading">{title}</h3>
                <p>{teaser}</p>
            </div>
        </div>
    )
}

MediaContentBloc.propTypes = {
    id: PropTypes.string.isRequired
};
export default MediaContentBloc;

```

### Register your component
To register your component you have to edit the file components/registerComponents.js. This file
is used to merge OOTB components provided by the **Jahia SDK** and the component you specifically
developed for your application.

To register your component import it and add an entry in the **componentsByType** `assign` function to map your component
to the appropriate content definition.
```js
import MediaContentBloc from './MediaContentBloc';
```

```js
Object.assign(componentsByType, {
    ...
    'hicnt:mediaContentBloc': MediaContentBloc
});
```

>Note: You can also register component by mixin with the object **componentByMixin**
 
Now you should be able to render properly your content in your app.

[jahia-website]: https://www.jahia.com
[vercel-website]: https://vercel.com
[initiative.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/README.md
[setup.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/setup.md
[archi.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/architecture.md
[content-type.md]: https://github.com/Jahia/jahia-industrial/blob/main/README.md

[jahia-industrial]: https://github.com/Jahia/jahia-industrial
[create-next-app]: https://github.com/vercel/next.js/tree/canary/packages/create-next-app
