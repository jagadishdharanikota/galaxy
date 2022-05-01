class ActionHandler {
  constructor(requisite) {
    this.requisite = requisite;

    this.context = this.requisite.context;
    this.config = requisite.config;
    this.resolvedConfig = this.requisite.resolvedConfig;
    this.actions = this.requisite.getActions();

    this.changeHandler = this.changeHandler.bind(this);
  }

  /*
  clickHandler(event) {
  }
  */

  changeHandler(event) {
    const { target } = event;
    const { value } = target;

    if (
      this.context &&
      this.config.propertyReference &&
      this.resolvedConfig.propertyReference !== value
    ) {
      this.actions.setValue({
        contextPath: this.context,
        property: this.config.propertyReference,
        value,
      });
    }
  }
}

export default ActionHandler;
