class Compontent {
  setState (newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  };
}
class Ipt extends Compontent {
  constructor ({ root }) {
    super();
    this.root = root;
    this.state = {
      val: '',
      error: false
    };
    this.render();
  }

  handleClick () {
    this.setState({
      val: this.value,
      error: this.value.length > 10
    });
  };
  render () {
    const state = this.state; ;
    root.innerHTML = `
    <input type="text" id="ipt" value="${state.val}" oninput="handleClick()">
    <p id="error" style="display:${state.error ? 'block' : 'none'}">长度不能超过10个字</p>
    `;
  }
}
const root = document.getElementById('root');
const ipt = new Ipt(root);
window.handleClick = ipt.handleClick.bind(ipt);
