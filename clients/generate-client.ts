import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { OpenApiNestFactory } from "nest-openapi-tools";
// @ts-ignore
import { AppModule } from "./app.module";

async function generate() {
    const app = await NestFactory.create(AppModule);
  
    const documentBuilder = new DocumentBuilder()
        .setTitle('Car advisor')
        .setVersion('v1');

    return OpenApiNestFactory.configure(app, documentBuilder, {
        fileGeneratorOptions: {
            enabled: true,
            outputFilePath: './clients/api-spec.yaml'
        },
        clientGeneratorOptions: {
            enabled: true,
            type: 'typescript-angular',
            outputFolderPath: './clients/client',
            openApiFilePath: './clients/api-spec.yaml',
            additionalProperties: [
                'apiModulePrefix=gen',
                'configurationModulePrefix=gen',
                'fileNaming=kebab-case',
                'modelFileSuffix=.model',
                'enumNameSuffix=""',
                'withoutPrefixEnums=true',
                'withSeparateModelsAndApi=true',
                'stringEnums=true'
            ].join(','),
        }
    });
}
generate();
