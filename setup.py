from setuptools import setup, find_packages
from codecs import open
from os import path
try:
    from pip._internal.req import parse_requirements
except ImportError:
    from pip.req import parse_requirements

here = path.abspath(path.dirname(__file__))
install_reqs = parse_requirements(here + '/requirements.txt', session=False)
reqs = [str(ir.req) for ir in install_reqs]

# Get the long description from the relevant file
with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='MVU',
    version='1.0',
    description='Forest Hack MVU',
    long_description=long_description,
    url='https://github.com/MielikkiUH/MVP.git',
    author='Francisco Vargas',
    author_email='vargfran@gmail.com',
    license='MIT',
    keywords='ML Forest GRS',
    install_requires=reqs,
)
