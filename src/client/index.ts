import { register_lorebook } from '@client/lorebook';
import { register_preset } from '@client/preset';
import { compare } from 'compare-versions';

$(() => {
  register_lorebook();
  register_preset();
});
