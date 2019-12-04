export default function whyDidComponentUpdate(componentName) {
  return function (a) {
    const b = this.props;
    const aProps = Object.keys(a);
    const bProps = Object.keys(b);
    bProps.forEach((prop) => {
      if (!aProps.includes(prop)) {
        aProps.push(prop);
      }
    });

    const unequalProps = [];
    aProps.forEach((prop) => {
      if (a[prop] !== b[prop]) {
        unequalProps.push(prop);
      }
    });

    if (unequalProps.length) {
      const label = `Component ${componentName} did update`;
      console.group(label);
      unequalProps.forEach((prop) => {
        console.group(prop)
        console.info(a[prop]);
        console.info(b[prop]);
        console.groupEnd(prop);
      });
      console.groupEnd(label);
    }
  };
}
