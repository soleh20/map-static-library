'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var Async = require('react-promise');
var invariant = require('invariant');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var Async__default = /*#__PURE__*/_interopDefaultLegacy(Async);
var invariant__default = /*#__PURE__*/_interopDefaultLegacy(invariant);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function urlBuilder(property, value, separator) {
  if (value) {
    return `${property}${separator}${value}`;
  }

  return null;
}
function locationBuilder(location) {
  const urlParts = [];

  if (Array.isArray(location)) {
    const arrParts = location.map(val => locationBuilder(val));
    urlParts.push(...arrParts);
  }

  if (typeof location === 'string' || typeof location === 'number') {
    urlParts.push(location);
  }

  if (typeof location === 'object' && location.lat && location.lng) {
    urlParts.push(`${location.lat},${location.lng}`);
  }

  return urlParts.join('%7C'); // |
}
function isStatelessComponent(component) {
  return !component.render && !(component.prototype && component.prototype.render);
}
function isClassComponent(component) {
  return Boolean(component && component.prototype.isReactComponent && component.prototype.render);
}
function renderStatelessComponent(component, props) {
  return component(props);
}
function renderClassComponent(component, props) {
  return new component(props).render();
}

const markerStrategy = ({
  props,
  type: {
    defaultProps
  }
}, parentProps) => {
  const {
    size,
    color,
    label,
    anchor,
    iconURL,
    location,
    scale
  } = props;
  invariant__default["default"](location, 'Marker expects a valid location prop');
  let urlParts = []; // Todo: Remove the property if the defaultProp and Prop value is the same

  urlParts.push(urlBuilder('size', size, ':'));
  urlParts.push(urlBuilder('color', color, ':'));
  urlParts.push(urlBuilder('label', label, ':'));
  urlParts.push(urlBuilder('anchor', anchor, ':'));
  urlParts.push(urlBuilder('scale', scale, ':'));
  urlParts.push(urlBuilder('icon', iconURL, ':'));
  urlParts.push(urlBuilder('', locationBuilder(location), ''));
  const url = urlParts.filter(x => x).join('%7C'); // |

  return `markers=${url}`;
};

const pathStrategy = ({
  props,
  type: {
    defaultProps
  }
}, parentProps) => {
  const {
    weight,
    color,
    fillcolor,
    geodesic,
    points
  } = props;
  invariant__default["default"](points, 'Path expects a valid points prop');
  const urlParts = []; // Todo: Remove the property if the defaultProp and Prop value is the same

  urlParts.push(urlBuilder('color', color, ':'));
  urlParts.push(urlBuilder('weight', weight, ':'));
  urlParts.push(urlBuilder('fillcolor', fillcolor, ':'));
  urlParts.push(urlBuilder('geodesic', geodesic, ':'));
  urlParts.push(urlBuilder('', locationBuilder(points), ''));
  const url = urlParts.filter(x => x).join('%7C'); //|

  return `path=${url}`;
};

const markerGroupStrategy = ({
  props,
  type: {
    defaultProps
  }
}, parentProps) => {
  const {
    size,
    color,
    label,
    anchor,
    iconURL,
    children,
    scale
  } = props;
  const location = React.Children.map(children, child => child.props.location);
  return markerStrategy({
    props: {
      size,
      color,
      label,
      anchor,
      iconURL,
      location,
      scale
    },
    type: {
      defaultProps
    }
  });
};

const pathGroupStrategy = ({
  props,
  type: {
    defaultProps
  }
}, parentProps) => {
  const {
    weight,
    color,
    fillcolor,
    geodesic,
    children
  } = props;
  const points = React.Children.map(children, child => child.props.points);
  return pathStrategy({
    props: {
      weight,
      color,
      fillcolor,
      geodesic,
      points
    },
    type: {
      defaultProps
    }
  });
};

function nativeStrategy(data) {
  const {
    origin,
    destination,
    travelMode
  } = data;
  let originLocation;
  let destinationLocation;

  if (typeof origin === 'object' && origin.lat && origin.lng) {
    originLocation = new google.maps.LatLng(origin);
  } else {
    originLocation = origin;
  }

  if (typeof destination === 'object' && destination.lat && destination.lng) {
    destinationLocation = new google.maps.LatLng(destination);
  } else {
    destinationLocation = destination;
  }

  const DirectionsService = new google.maps.DirectionsService();
  return new Promise((resolve, reject) => {
    DirectionsService.route({
      origin: originLocation,
      destination: destinationLocation,
      travelMode: travelMode.toUpperCase()
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result.routes[0].overview_polyline);
      }

      reject(status);
    });
  });
}

function fetchStrategy(data) {
  const {
    baseURL,
    key,
    origin,
    destination
  } = data;
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  };
  let originLocation;
  let destinationLocation;

  if (typeof origin === 'object' && origin.lat && origin.lng) {
    originLocation = `${origin.lat},${origin.lng}`;
  } else {
    originLocation = origin;
  }

  if (typeof destination === 'object' && destination.lat && destination.lng) {
    destinationLocation = `${destination.lat},${destination.lng}`;
  } else {
    destinationLocation = destination;
  }

  const URL = `${baseURL}?origin=${originLocation}&destination=${destinationLocation}&key=${key}`;
  return fetch(URL, options).then(res => res.json()).then(res => res.routes[0].overview_polyline.points);
}

const _excluded$1 = ["baseURL", "requestStrategy", "origin", "destination", "apiKey", "waypoints", "avoid", "travelMode", "transitMode", "transitRoutingPreference", "weight", "color", "fillcolor", "geodesic"];
const memoizeDirectionStrategy = (directionStrategy, cache = {}) => {
  return function ({
    props
  }, parentProps) {
    const key = JSON.stringify(props);

    if (cache[key]) {
      return cache[key];
    } else {
      const promise = directionStrategy.apply(null, arguments).then(strat => {
        // When this finally resolves, set the value of the cache to
        // the string path result. Subsequent renders will return a string
        // and use the base component instead of the Async component and
        // not cause the flash
        cache[key] = strat;

        if (parentProps.onCacheUpdate) {
          parentProps.onCacheUpdate(_objectSpread2({}, cache));
        }

        return strat;
      }); // Return the pending promise immedietly and the StaticGoogleMap
      // usage of the Async component will eventually handle it because
      // this function returned a Promise. This piece of the code prevents
      // multiple calls to google on each render, but does not solve the
      // "flash" of the Async component.

      cache[key] = promise;
      return promise;
    }
  };
};

const directionStrategy = ({
  props,
  type: {
    defaultProps
  }
}, parentProps) => {
  const {
    baseURL,
    requestStrategy,
    origin,
    destination,
    apiKey,
    waypoints,
    avoid,
    travelMode,
    transitMode,
    transitRoutingPreference,
    weight,
    color,
    fillcolor,
    geodesic
  } = props,
        rest = _objectWithoutProperties(props, _excluded$1);

  invariant__default["default"](origin, 'Origin prop is required');
  invariant__default["default"](destination, 'Destination prop is required'); // Use the parent's API key if one isn't set here.

  const key = apiKey ? apiKey : parentProps ? parentProps.apiKey : '';

  const data = _objectSpread2({
    key,
    baseURL,
    origin,
    destination,
    waypoints,
    avoid,
    travelMode,
    transitMode,
    transitRoutingPreference
  }, rest);

  let pathPromise;

  if (typeof requestStrategy !== 'string') {
    pathPromise = requestStrategy(data);
  } else {
    switch (requestStrategy) {
      case 'native':
        pathPromise = nativeStrategy(data);
        break;

      case 'fetch':
        pathPromise = fetchStrategy(data);
        break;

      default:
        throw new Error('Specify a Request strategy to get directions from');
    }
  }

  return pathPromise.then(path => pathStrategy({
    props: {
      weight,
      color,
      fillcolor,
      geodesic,
      points: `enc:${path}`
    },
    type: {
      defaultProps
    }
  }));
};

const MapStrategy = props => {
  const {
    rootURL,
    size,
    zoom,
    scale,
    style,
    mapId,
    center,
    format,
    client,
    region,
    visible,
    channel,
    maptype,
    language,
    signature,
    apiKey
  } = props;
  const urlParts = [];
  urlParts.push(urlBuilder('size', size, '='));
  urlParts.push(urlBuilder('zoom', zoom, '='));
  urlParts.push(urlBuilder('scale', scale, '='));
  urlParts.push(urlBuilder('style', style, '='));
  urlParts.push(urlBuilder('map_id', mapId, '='));
  urlParts.push(urlBuilder('center', center, '=')); // Todo: Allow Objects.

  urlParts.push(urlBuilder('format', format, '='));
  urlParts.push(urlBuilder('client', client, '='));
  urlParts.push(urlBuilder('region', region, '='));
  urlParts.push(urlBuilder('visible', visible, '='));
  urlParts.push(urlBuilder('channel', channel, '='));
  urlParts.push(urlBuilder('maptype', maptype, '='));
  urlParts.push(urlBuilder('language', language, '='));
  urlParts.push(urlBuilder('signature', signature, '='));
  urlParts.push(urlBuilder('key', apiKey, '='));
  const parts = urlParts.filter(x => x).join('&');
  return `${rootURL}?${parts}`;
};

const propTypes$2 = {
  size: PropTypes__default["default"].oneOf(['tiny', 'mid', 'small', 'normal']),
  color: PropTypes__default["default"].string,
  iconURL: PropTypes__default["default"].any,
  label: PropTypes__default["default"].string,
  anchor: PropTypes__default["default"].string,
  location: PropTypes__default["default"].any.isRequired
};
const defaultProps$2 = {
  size: 'normal'
};
const groupPropTypes$1 = {
  size: PropTypes__default["default"].oneOf(['tiny', 'mid', 'small', 'normal']),
  color: PropTypes__default["default"].string,
  iconURL: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  anchor: PropTypes__default["default"].string
};

const Marker = () => null;

Marker.propTypes = propTypes$2;
Marker.defaultProps = defaultProps$2;

const MarkerGroup = () => null;

MarkerGroup.propTypes = groupPropTypes$1;
MarkerGroup.defaultProps = defaultProps$2;
Marker.Group = MarkerGroup;

const propTypes$1 = {
  weight: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  color: PropTypes__default["default"].string,
  fillcolor: PropTypes__default["default"].string,
  geodesic: PropTypes__default["default"].bool,
  points: PropTypes__default["default"].any.isRequired
};
const groupPropTypes = {
  weight: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  color: PropTypes__default["default"].string,
  fillcolor: PropTypes__default["default"].string,
  geodesic: PropTypes__default["default"].bool
};
const defaultProps$1 = {
  weight: 5,
  geodesic: false
};

const Path = () => null;

Path.propTypes = propTypes$1;
Path.defaultProps = defaultProps$1;

const PathGroup = () => null;

PathGroup.propsTypes = groupPropTypes;
PathGroup.defaultProps = defaultProps$1;
Path.Group = PathGroup;

const propTypes = {
  baseURL: PropTypes__default["default"].string,
  origin: PropTypes__default["default"].string.isRequired,
  destination: PropTypes__default["default"].string.isRequired,
  apiKey: PropTypes__default["default"].string,
  waypoints: PropTypes__default["default"].any,
  avoid: PropTypes__default["default"].string,
  travelMode: PropTypes__default["default"].oneOf(['driving', 'walking', 'bicycling', 'transit']),
  transitMode: PropTypes__default["default"].oneOf(['bus', 'subway', 'train', 'tram', 'rail']),
  transitRoutingPreference: PropTypes__default["default"].oneOf(['less_walking', 'fewer_transfers']),
  requestStrategy: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].oneOf(['fetch', 'native'])]).isRequired,
  weight: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  color: PropTypes__default["default"].string,
  fillcolor: PropTypes__default["default"].string,
  geodesic: PropTypes__default["default"].bool
};
const defaultProps = {
  baseURL: 'https://maps.googleapis.com/maps/api/directions/json',
  travelMode: 'driving',
  requestStrategy: 'native',
  weight: 5,
  geodesic: false
};

const Direction = () => null;

Direction.propTypes = propTypes;
Direction.defaultProps = defaultProps;

const _excluded = ["children", "onGenerate", "as"],
      _excluded2 = ["rootURL", "size", "zoom", "scale", "style", "mapId", "center", "format", "client", "region", "visible", "channel", "maptype", "language", "signature", "apiKey", "cache", "onCacheUpdate"];

class StaticGoogleMap extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "MemoizedDirectionStrategy", memoizeDirectionStrategy(directionStrategy, _objectSpread2({}, this.props.cache)));
  }

  buildParts(children, props) {
    return React__default["default"].Children.map(children, child => {
      if (! /*#__PURE__*/React__default["default"].isValidElement(child)) {
        return null;
      }

      switch (child.type) {
        case Marker:
          return markerStrategy(child);

        case Marker.Group:
          return markerGroupStrategy(child);

        case Path:
          return pathStrategy(child);

        case Path.Group:
          return pathGroupStrategy(child);

        case Direction:
          if (props.cache) {
            return this.MemoizedDirectionStrategy(child, props);
          }

          return directionStrategy(child, props);

        default:
          const componentType = child.type;

          if (isStatelessComponent(componentType)) {
            return this.buildParts(renderStatelessComponent(componentType, _objectSpread2({}, child.props)), props);
          }

          if (isClassComponent(componentType)) {
            return this.buildParts(renderClassComponent(componentType, _objectSpread2({}, child.props)), props);
          }

          return null;
      }
    });
  }

  render() {
    const _this$props = this.props,
          {
      children,
      onGenerate,
      as: Component
    } = _this$props,
          props = _objectWithoutProperties(_this$props, _excluded);

    const {
      rootURL,
      size,
      zoom,
      scale,
      style,
      mapId,
      center,
      format,
      client,
      region,
      visible,
      channel,
      maptype,
      language,
      signature,
      apiKey,
      cache,
      onCacheUpdate
    } = props,
          componentProps = _objectWithoutProperties(props, _excluded2);

    invariant__default["default"](size, 'size property is not set');
    invariant__default["default"](children, 'Component must have `Marker`, `Path` or `Direction` child');
    const childrenUrlParts = this.buildParts(children, props) || [];
    const mainUrlParts = MapStrategy(props);
    /**
     * All the parts should return a string if a component that does not return a promise isn't used
     * The Directions's component returns a promise and would instead use the Async component to render
     * This allows us render sync otherwise and partially support server side rendering.
     */

    if (!childrenUrlParts.some(part => typeof part === 'object')) {
      const childURL = childrenUrlParts.filter(part => part).join('&');
      const url = `${mainUrlParts}&${childURL}`;

      if (onGenerate) {
        onGenerate(url);
      }

      return /*#__PURE__*/React__default["default"].createElement(Component, _extends({}, componentProps, {
        src: url
      }));
    }

    const urlParts = Promise.all(childrenUrlParts).then(parts => `${mainUrlParts}&${parts.filter(part => part).join('&')}`);
    return /*#__PURE__*/React__default["default"].createElement(Async__default["default"], {
      promise: urlParts,
      then: URL => {
        if (onGenerate) {
          onGenerate(URL);
        }

        return /*#__PURE__*/React__default["default"].createElement(Component, _extends({}, componentProps, {
          src: URL
        }));
      },
      catch: err => (console.error(err), /*#__PURE__*/React__default["default"].createElement("span", null, "Image generation failed."))
    });
  }

}

_defineProperty(StaticGoogleMap, "defaultProps", {
  as: 'img',
  scale: 1,
  format: 'png',
  rootURL: 'https://maps.googleapis.com/maps/api/staticmap',
  apiKey: '',
  maptype: 'roadmap',
  cache: true
});

exports.Direction = Direction;
exports.Marker = Marker;
exports.Path = Path;
exports.StaticGoogleMap = StaticGoogleMap;