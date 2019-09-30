import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import DeleteButton from 'views/components/DeleteButton';
import EditButton from 'views/components/EditButton';
import LinkButton from '../LinkButton';
import SaveCancelInput from 'views/components/SaveCancelInput';
import Badge from 'views/components/Badge';

interface Props<T> {
  element: T,
  label: string,
  color?: string,
  link?: string,
  remove: (element: T) => void,
  update: (element: T, value: string) => void
}

interface State {
  editing: boolean,
  value?: string,
}

const ButtonsContainer = styled.span`
position: absolute;
right: 0px;
width: 100%;
text-align: right;
button{
  font-size: 0.8rem;
  margin: 0px 2px 0px 0px;
}
`;

export default class EditableRemovableListItem<T> extends Component<Props<T>, State> {

  state = {
    editing: false,
    value: ''
  }

  saveLabelValue = (value: string) => {
    const { element, update } = this.props;

    update(element, value);

    this.setState({
      editing: false
    });
  }

  render() {
    const {
      element,
      remove,
      label,
      color,
      link,
    } = this.props;

    const {
      editing,
    } = this.state;

    if (editing) {
      return <SaveCancelInput
        initialValue={label}
        save={this.saveLabelValue}
        cancel={() => this.setState({ editing: false })}
      />;
    }


    return <Fragment>
      <ButtonsContainer>
        {
          link &&
          <LinkButton to={link} />
        }
        <EditButton onClick={() => this.setState({ editing: true })} />
        <DeleteButton onClick={() => remove(element)} />
      </ButtonsContainer>
      <Badge label={label} color={color} />
    </Fragment>

  }
}
