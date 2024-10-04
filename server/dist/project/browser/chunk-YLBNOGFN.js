function a(s){let t=s.get("password"),r=s.get("confirmPassword"),o={passswordShouldMatch:{mismatch:!0}};return t?.value===r?.value?null:(r?.setErrors(o),o)}export{a};
