import React from "react";
import { RouteComponentProps } from "react-router-dom";
type IdParams = { id: string };

const EditExpensePage = (props: RouteComponentProps<IdParams>) => 
{
    console.log(props);
    return (<div>Editing the expense with id {props.match.params.id}.</div>);
}

export default EditExpensePage;