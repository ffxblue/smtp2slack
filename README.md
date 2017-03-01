SMTP2SLACK
==========

Based upon smtp2slack, by 3846masa.

Almost fully rewritten to send email to a single slack channel.

## Usage

1. Set MX record
1. Install docker-compose
1. Edit ``SLACK_TOKEN`` in docker-compose.yml
1. Set the ``SLACK_CHANNEL`` to send the mail to.
1. ``docker-compose up -d``
1. Forward an email to ``any_address@example.com``

## Email Suffixes

If you set ``EMAIL_SUFFIXES``, mail addresses will be tested before delivering to the slack channel. This variable should be a comma-separated list of domains to accept.

For example, if you set ``example.com``, the addresses accepted are in the form ``<some_address>@example.com`` - all others are silently discarded.

## LICENSE

(c) 2017 Fairfax Media Ltd - MIT Licence

(c) 3846masa MIT
