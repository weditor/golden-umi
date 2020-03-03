
import * as React from 'react'
import client from '@/graphqlClient'
import { gql } from 'apollo-boost';

class TopicView extends React.Component<any, any> {
    componentDidMount() {
        client.query({
            query: gql`{
                conferences {
                  edges {
                    node {
                      name
                      description
                    }
                  }
                }
              }`
        }).then(ret => console.log(ret))
    }
    render() {
        return <div>This is TopicView</div>
    }
}

export default TopicView;
