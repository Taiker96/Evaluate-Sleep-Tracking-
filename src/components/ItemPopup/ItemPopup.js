import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import './style.scss';

class ItemPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      visible: props.visible
    });
  }

  render() {
    const {
      title = '',
      className = '',
      visible = false,
      centered = true,
      point = '',
      content = ''
    } = this.props;
    return (
      <Modal
        isOpen={visible}
        toggle={this.props.toggle}
        className={className}
        size={'xl'}
        centered={centered}
      >
        <ModalHeader toggle={this.props.toggle}>{title}</ModalHeader>
        <ModalBody>
          <div className="children">{content}</div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ItemPopup;
