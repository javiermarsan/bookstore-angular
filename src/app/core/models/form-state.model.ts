import { DictionaryString } from './dictionary-string.model';

export interface FormState {
  errors?: any;
  labels?: DictionaryString;
  isSubmitting?: boolean;
  isLoading?: boolean;
}
