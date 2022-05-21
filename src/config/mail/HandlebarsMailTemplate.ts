import handlebars from 'handlebars';
import fs from 'fs';

export default class HandlebarsMailTemplate {
  public async parser({
    file,
    variables,
  }: IParserMailTemplate): Promise<string> {
    const templateFIleContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFIleContent);

    return parseTemplate(variables);
  }
}
