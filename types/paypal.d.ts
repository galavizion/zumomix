declare module '@paypal/checkout-server-sdk' {
  export class core {
    static SandboxEnvironment: any;
    static LiveEnvironment: any;
    static PayPalHttpClient: any;
  }

  export class orders {
    static OrdersCreateRequest: any;
    static OrdersCaptureRequest: any;
  }
}
