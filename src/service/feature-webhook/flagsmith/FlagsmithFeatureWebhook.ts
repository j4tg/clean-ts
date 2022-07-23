import { tryCatch } from "@/shared/error/catch";
import { injectable } from "tsyringe";
import { Feature } from "../Feature";
import { FeatureWebhook } from "../FeatureWebhook";
import { PayloadSchema } from "./schema/PayloadSchema";

@injectable()
export class FlagsmithFeatureWebhook implements FeatureWebhook {
  @tryCatch()
  toFeature(dirty: { [k: string]: any }): Feature {
    const payload = PayloadSchema.parse(dirty);

    const name = payload.data.new_state.feature.name;
    const isEnabled = !!payload.data.new_state.enabled;

    return {
      name: name,
      isEnabled: isEnabled,
    };
  }

  @tryCatch()
  async toFeatureAsync(dirty: { [k: string]: any }): Promise<Feature> {
    const payload = PayloadSchema.parse(dirty);

    const name = payload.data.new_state.feature.name;
    const isEnabled = !!payload.data.new_state.enabled;

    return {
      name: name,
      isEnabled: isEnabled,
    };
  }
}
