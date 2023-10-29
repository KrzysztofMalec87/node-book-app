import { ZodFirstPartySchemaTypes } from 'zod';

export interface IValidateZodSchema {
    dto: unknown;
    schema: ZodFirstPartySchemaTypes;
}

export const validateZodSchema = <T>(payload: IValidateZodSchema): T => {
    const { dto, schema } = payload;

    try {
        return schema.parse(dto);
    } catch (error) {
        throw new Error(`Error parsing DTO ${error}`);
    }
};
