export var version = "2.2.2";

var HANDLER = "_vue_clickaway_handler";

function bind(el, binding, vnode) {
  unbind(el);

  var vm = vnode.context;

  var callback = binding.value;
  if (typeof callback !== "function") {
    return;
  }
  var initialMacrotaskEnded = false;
  setTimeout(function() {
    initialMacrotaskEnded = true;
  }, 0);

  el[HANDLER] = function(ev) {
    // @NOTE: this test used to be just `el.containts`, but working with path is better,
    //        because it tests whether the element was there at the time of
    //        the click, not whether it is there now, that the event has arrived
    //        to the top.
    // @NOTE: `.path` is non-standard, the standard way is `.composedPath()`
    var path = ev.path || (ev.composedPath ? ev.composedPath() : undefined);
    if (
      initialMacrotaskEnded &&
      (path ? path.indexOf(el) < 0 : !el.contains(ev.target))
    ) {
      return callback.call(vm, ev);
    }
  };

  document.documentElement.addEventListener("click", el[HANDLER], false);
}

function unbind(el) {
  document.documentElement.removeEventListener("click", el[HANDLER], false);
  delete el[HANDLER];
}

export var directive = {
  bind: bind,
  update: function(el, binding) {
    if (binding.value === binding.oldValue) return;
    bind(el, binding);
  },
  unbind: unbind
};

export var mixin = {
  directives: { onClickaway: directive }
};
