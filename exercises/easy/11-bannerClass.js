// Behold this incomplete class for constructing boxed banners.

class Banner {
  constructor(message, width = message.length) {
    this.message = message;
    this.width = width;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${"-".repeat(this.width)}-+`;
  }

  emptyLine() {
    return `| ${" ".repeat(this.width)} |`;
  }

  messageLine() {
    return `| ${this.message} |`
  }
}
// Complete this class so that the test cases shown below work as intended. You are free to add any properties you need.

// You may assume that the input will always fit in your terminal window.

// Test Cases

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+