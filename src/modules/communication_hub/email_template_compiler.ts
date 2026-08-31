/**
 * Handlebars-Style Variable Interpolator & Email Template Compiler
 */

export class EmailTemplateCompiler {
  public compile(templateHtml: string, context: Record<string, any>): string {
    let output = templateHtml;

    for (const [key, value] of Object.entries(context)) {
      if (typeof value === 'object' && value !== null) {
        for (const [subKey, subVal] of Object.entries(value)) {
          const pattern = new RegExp(`\{\{${key}\.${subKey}\}\}`, 'g');
          output = output.replace(pattern, String(subVal ?? ''));
        }
      } else {
        const pattern = new RegExp(`\{\{${key}\}\}`, 'g');
        output = output.replace(pattern, String(value ?? ''));
      }
    }

    return output;
  }
}
