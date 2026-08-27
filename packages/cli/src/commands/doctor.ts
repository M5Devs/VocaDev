import chalk from 'chalk';
import { detectEditors } from '../utils/editors.js';
import { THEME_REGISTRY } from '../utils/themes.js';
import type { DoctorCheckResult } from '../types.js';

export function doctorCommand(customHome?: string): DoctorCheckResult[] {
  console.log(`\n🩺 ${chalk.bold('VocaDev Health Check & Diagnostics')}\n`);

  const results: DoctorCheckResult[] = [];
  const editors = detectEditors('miku', customHome);

  // Check 1: Editor Installations
  console.log(chalk.bold('🔍 Checking Code Editors:'));
  for (const ed of editors) {
    if (ed.installed) {
      console.log(chalk.green(`  ✓ ${ed.name}: Detected at ${ed.path}`));
      results.push({
        category: 'Editors',
        check: `${ed.name} installation`,
        status: 'ok',
        message: `Detected at ${ed.path}`,
      });
    } else {
      console.log(chalk.yellow(`  ! ${ed.name}: Not detected`));
      results.push({
        category: 'Editors',
        check: `${ed.name} installation`,
        status: 'warning',
        message: 'Editor directory not found',
        fix: `Install ${ed.name} if you plan to use VocaDev theme for it.`,
      });
    }
  }

  // Check 2: Theme Installations & Version Check
  console.log(`\n🔍 ${chalk.bold('Checking Theme Installations:')}`);
  for (const ed of editors) {
    if (!ed.installed) continue;

    if (ed.themeInstalled) {
      console.log(chalk.green(`  ✓ ${ed.name}: Hatsune Miku theme installed (v${THEME_REGISTRY.miku.version})`));
      results.push({
        category: 'Themes',
        check: `${ed.name} theme`,
        status: 'ok',
        message: `Hatsune Miku theme installed (v${THEME_REGISTRY.miku.version})`,
      });
    } else {
      console.log(chalk.yellow(`  ! ${ed.name}: Theme not installed`));
      results.push({
        category: 'Themes',
        check: `${ed.name} theme`,
        status: 'warning',
        message: 'Theme missing',
        fix: `Run \`vocadev install miku --${ed.type}\` to install theme.`,
      });
    }
  }

  // Summary and Fix Suggestions
  const warnings = results.filter((r) => r.status === 'warning');
  const errors = results.filter((r) => r.status === 'error');

  console.log(`\n📊 ${chalk.bold('Diagnostic Summary:')}`);
  if (warnings.length === 0 && errors.length === 0) {
    console.log(chalk.green('  ✨ All checks passed! VocaDev environment is healthy.'));
  } else {
    console.log(chalk.yellow(`  Found ${warnings.length} warning(s) and ${errors.length} error(s).\n`));
    console.log(chalk.bold('💡 Suggested Fixes:'));
    for (const r of [...warnings, ...errors]) {
      if (r.fix) {
        console.log(chalk.cyan(`  - ${r.check}: ${r.fix}`));
      }
    }
  }

  console.log('');
  return results;
}
