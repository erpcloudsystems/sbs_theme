# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in sbs_theme/__init__.py
from sbs_theme import __version__ as version

setup(
	name='sbs_theme',
	version=version,
	description='them for sbs website',
	author='ERPCloud.Systems',
	author_email='mg@erpcloud.systems',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
