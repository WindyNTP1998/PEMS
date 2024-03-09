export class BravoCommonModuleConfig {
    public defaultLanguage!: string;
    public slowRequestBreakpoint!: number;
    public stripeStriptSrc!: string;
}

export const defaultBravoCommonModuleConfig: BravoCommonModuleConfig = {
    defaultLanguage: 'en',
    slowRequestBreakpoint: 500,
    stripeStriptSrc: 'https://js.stripe.com/v3/'
};
