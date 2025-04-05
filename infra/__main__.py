"""A Python Pulumi program"""

import pulumi
import pulumi_aws as aws

stack = pulumi.get_stack()

bucket = aws.s3.BucketV2(f"paperize-dms-user-upload-{stack}")
user = aws.iam.User(f"paperize-dms-access-user-{stack}")

user_bucket_policy = aws.iam.Policy(
    f"paperize-dms-user-upload-policy-{stack}",
    policy = bucket.arn.apply(
        lambda arn: {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:ListBucket"
                    ],
                    "Resource": arn
                },
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:PutObject",
                        "s3:GetObject",
                        "s3:DeleteObject"
                    ],
                    "Resource": f"{arn}/*"
                }
            ]
        }
    )
)

aws.iam.UserPolicyAttachment(
    f"paperize-dms-user-upload-policy-attachment-{stack}",
    user=user.name,
    policy_arn=user_bucket_policy.arn
)

access_key = aws.iam.AccessKey(
    f"paperize-dms-access-key-{stack}",
    user=user.name
)

pulumi.export("bucket_name", bucket.bucket)
pulumi.export("bucket_region", bucket.region)
pulumi.export("access_key_id", access_key.id)
pulumi.export("access_key_secret", access_key.secret)