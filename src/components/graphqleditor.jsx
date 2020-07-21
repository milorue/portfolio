import React from 'react';
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import './graphqltheme.css'

function GraphQLFetcher(graphQLParams){
    return fetch("https://milorue.herokuapp.com/", {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams),
    }).then(response => response.json())
}

function GraphQLEditor(){
    return(
        <GraphiQL fetcher={GraphQLFetcher} docExplorerOpen={false} defaultSecondaryEditorOpen={false}/>
    )
}

export default GraphQLEditor