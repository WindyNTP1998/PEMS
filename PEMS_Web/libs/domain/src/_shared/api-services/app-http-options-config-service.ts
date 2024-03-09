import { HttpClientOptions, PlatformHttpOptionsConfigService } from '@pem/platform-core';

export class AppHttpOptionsConfigService extends PlatformHttpOptionsConfigService {
    public configOptions(options: HttpClientOptions): HttpClientOptions {
        if (options.headers == null) options.headers = {};

        return options;
    }
}
