import { ValueTransformer } from 'typeorm';

class ColumnNumericTransformer implements ValueTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data);
  }
}

export default ColumnNumericTransformer;
