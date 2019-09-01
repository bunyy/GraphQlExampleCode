import React, { PureComponent } from "react";
import { Modal } from "reactstrap";

//Import Styles
import style from "./style.module.scss";

export default class ModalDialog extends PureComponent {
  render() {
    const closeBtn = (
      <span className="lnr lnr-cross" onClick={this.props.toggle} />
    );
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={style["modal__dialog"]}
        contentClassName={style["modal__content"]}
      >
        <div className={style["modal__header"]}>
          <div className={style["modal__title"]}>{this.props.title}</div>
          <div className={style["modal__icon"]}>{closeBtn}</div>
        </div>
        <div className="theme-light">{this.props.children}</div>
      </Modal>
    );
  }
}
