interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParserMailTemplate {
  file: string;
  variables: ITemplateVariable;
}
