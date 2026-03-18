declare module '@primeuix/utils' {
  export const cn: (...args: any[]) => string;
  export const EventBus: any;
  export interface EventBusOptions {
    [key: string]: any;
  }
}
declare module '@primeuix/utils/eventbus' {
  export const EventBus: any;
  export interface EventBusOptions {
    [key: string]: any;
  }
}
declare module '@primeuix/utils/classnames';
declare module '@primeuix/utils/dom';
declare module '@primeuix/utils/mergeprops';
declare module '@primeuix/utils/object';
declare module '@primeuix/utils/uuid';
declare module '@primeuix/utils/zindex';